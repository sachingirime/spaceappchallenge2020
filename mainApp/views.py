from django.views import generic
from .models import Post
from django.shortcuts import render



def home(request):
    post_list = Post.objects.filter(status=1).order_by('-created_on')
    default_thumbnail="https://c8.alamy.com/comp/R0H9GD/future-technology-background-abstract-digitally-generated-imag-R0H9GD.jpg"
    template_name = "home.html"    
    return render(
        request,
        template_name,
        context= {
            'post_list':post_list,
            'default_thumbnail':default_thumbnail
            }
    )

def threeDimensional(request):
    template_name = "three_dimensional.html"    
    return render(
        request,
        template_name
    )

def about(request):
    template_name = "about.html"    
    return render(
        request,
        template_name
    )

def PostDetail(request,slug):
    post = Post.objects.get(slug=slug)
    context = {
		'post':post,
	}
    return render(request, 'post_detail.html',context=context)