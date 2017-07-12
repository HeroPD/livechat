var script = document.getElementById('livechat');

var container = document.createElement('div');
container.id = 'livechat-container';
container.style.position = 'fixed';
container.style.display = 'inline-block';
container.style.bottom = '10px';
container.style.right = '10px';
container.style.width = '70px';
container.style.height = '70px';

var frameContainer = document.createElement('div');
frameContainer.id = 'livechat-frame-container';
frameContainer.style.position = 'fixed';
frameContainer.style.display = 'inline-block';
frameContainer.style.bottom = '-'+script.height+'px';
frameContainer.style.right = '10px';
frameContainer.style.width = '350px';
frameContainer.style.height = script.height+'px';
frameContainer.style.WebkitTransition = 'all 0.3s';
frameContainer.style.transition = 'all 0.3s';


var closeButton = document.createElement('div');
closeButton.style.position = 'absolute';
closeButton.style.right = '15px';
closeButton.style.top = '15px';
closeButton.style.cursor = 'pointer';
closeButton.style.width = '15px';
closeButton.style.height = '15px';
closeButton.addEventListener('click',function(){
	frameContainer.style.bottom = '-'+script.height+'px';
});
var closesvg = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 220.176 220.176" style="enable-background:new 0 0 220.176 220.176;" xml:space="preserve" width="15px" height="15px">\
<g>\
	<g>\
		<g>\
			<path d="M131.577,110.084l84.176-84.146c5.897-5.928,5.897-15.565,0-21.492     c-5.928-5.928-15.595-5.928-21.492,0l-84.176,84.146L25.938,4.446c-5.928-5.928-15.565-5.928-21.492,0s-5.928,15.565,0,21.492     l84.146,84.146L4.446,194.26c-5.928,5.897-5.928,15.565,0,21.492c5.928,5.897,15.565,5.897,21.492,0l84.146-84.176l84.176,84.176     c5.897,5.897,15.565,5.897,21.492,0c5.897-5.928,5.897-15.595,0-21.492L131.577,110.084z" fill="#3c4145"/>\
		</g>\
	</g>\
</g>\
</svg>\
';
var parser = new DOMParser();
var doc = parser.parseFromString(closesvg, "image/svg+xml");
closeButton.appendChild(doc.documentElement);
frameContainer.appendChild(closeButton);

var iframe = document.createElement('iframe');
iframe.style.height = '100%';
iframe.style.width = '100%';
iframe.setAttribute('allowtransparency','true');
iframe.setAttribute('scrolling','no');
iframe.setAttribute('frameborder',0);
iframe.setAttribute('src',script.getAttribute('url'));
frameContainer.appendChild(iframe);

var chatOverlay = document.createElement('div');
chatOverlay.style.left = '0px';
chatOverlay.style.top = '0px';
chatOverlay.style.position = 'absolute';
chatOverlay.style.height = '60px';
chatOverlay.style.width = '60px';
chatOverlay.style.margin = '5px';
chatOverlay.style.cursor = 'pointer';
chatOverlay.addEventListener('click', function(){
	frameContainer.style.bottom = '10px';
});
var chatsvg = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 299.99 299.99" style="enable-background:new 0 0 299.99 299.99;" xml:space="preserve" width="60px" height="60px">\
<g>\
	<g>\
		<path d="M149.995,0C67.156,0,0,67.158,0,149.995S67.156,299.99,149.995,299.99c82.837,0,149.995-67.158,149.995-149.995    S232.831,0,149.995,0z M149.995,234.281c-17.709" fill="#fff"/>\
		<path d="M149.995,0C67.156,0,0,67.158,0,149.995S67.156,299.99,149.995,299.99c82.837,0,149.995-67.158,149.995-149.995    S232.831,0,149.995,0z M149.995,234.281c-17.709,0-34.292-4.16-48.573-11.383c-3.826,3.063-21.135,15.764-38.31,9.822    c10.382-9.832,12.275-21.301,12.024-29.269c-13.728-14.545-21.97-33.162-21.97-53.456c0.003-46.552,43.354-84.292,96.829-84.292    c53.477,0,96.829,37.739,96.829,84.292C246.824,196.548,203.472,234.281,149.995,234.281z" fill="#268bd4"/>\
	</g>\
</g>\
</svg>\
';
var parser = new DOMParser();
var doc = parser.parseFromString(chatsvg, "image/svg+xml");
chatOverlay.appendChild(doc.documentElement);
container.appendChild(chatOverlay);
document.body.appendChild(container);
document.body.appendChild(frameContainer)
