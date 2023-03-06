from flask import Flask, request, make_response
from werkzeug.exceptions import NotFound

app = Flask(__name__)

def ler_arquivo(nome):
    with open(nome, "r") as f:
        return f.read()

@app.route("/")
def baixar():
    try:
        src = request.args["src"]
        arq = ler_arquivo(src)
        resp = make_response(arq)
        resp.headers["Access-Control-Allow-Origin"] = "*"
        return resp
    except FileNotFoundError:
        raise NotFound() # Erro 404

app.run(port = "5000")