window.onload = function(){
	var source = document.querySelector("script[type='text/babel']").innerHTML;

	var code = Prism.highlight(source, Prism.languages.jsx);

	var element = document.createElement("pre");
	element.classList.add("sourcecode");
	element.innerHTML = "<code>" + code + "</code>";

	document.body.appendChild(element);


	//var header = document.createElement("header");
	//header.classList.add("demoheader");
	//header.innerHTML = "<div><img src='../_libs/edument_logo.png'><span>React course</span></div><h4>"+document.title+"</h4>";
	//document.body.innerHTML = "<header><div><img src='../_libs/edument_logo.png'><img src='../_libs/react_logo.png'></div><h4>"+document.title+"</h4></header>"+document.body.innerHTML;
};