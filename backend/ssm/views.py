from django.http import HttpResponse

def index(request):
   text = """<center><h1>secure-storage</h1></center>"""
   return HttpResponse(text)
