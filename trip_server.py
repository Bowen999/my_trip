import os
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import urlsplit

DOCROOT = "/root/my_trip"
ROUTES = {
    "/singapore-malaysia-bali.html": "/index.html",
    "/guide": "/guide.html",    # guide (organiser) edition; "/" is the traveller edition
    "/guide/": "/guide.html",
    "/new-england": "/new-england.html",   # New England road trip (organiser edition only)
    "/new-england/": "/new-england.html",
    "/la": "/la.html",    # LA × Disneyland 4 days (single edition)
    "/la/": "/la.html",
}


class Handler(SimpleHTTPRequestHandler):
    def send_error(self, code, message=None, explain=None):
        # Serve the illustrated 404 page (status stays 404).
        page = os.path.join(DOCROOT, "404.html")
        if code == 404 and os.path.isfile(page):
            with open(page, "rb") as f:
                body = f.read()
            self.send_response(404)
            self.send_header("Content-Type", "text/html; charset=utf-8")
            self.send_header("Content-Length", str(len(body)))
            self.end_headers()
            if self.command != "HEAD":
                self.wfile.write(body)
            return
        super().send_error(code, message, explain)

    def end_headers(self):
        # Always revalidate, so a rebuilt page shows up on a normal refresh (304 if unchanged).
        self.send_header("Cache-Control", "no-cache")
        super().end_headers()

    def send_head(self):
        path = urlsplit(self.path).path
        if path in ROUTES:
            self.path = ROUTES[path]
        return super().send_head()


if __name__ == "__main__":
    ThreadingHTTPServer(
        ("0.0.0.0", 8000), partial(Handler, directory=DOCROOT)
    ).serve_forever()
