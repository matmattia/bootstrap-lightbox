/**
* Bootstrap Lightbox
* @name bootstrap-lightbox.js
* @author Mattia - http://www.matriz.it
* @version 1.0.1
* @date August 10, 2022
* @copyright (c) 2022 Mattia at Matriz.it (info@matriz.it)
* @license MIT - http://opensource.org/licenses/mit-license.php
* @example Visit https://www.matriz.it/projects/bootstrap-lightbox/ for more informations
*/
document.addEventListener('DOMContentLoaded', function() {
	var a = document.querySelectorAll('a[href$=".jpg"],a[href$=".jpeg"],a[href$=".png"]'), l = a.length, i = 0, modal = {
		'modals': {},
		'openImage': function(url) {
			var m = null, d = null, c = null, h = null, bc = null, b = null, img = null;
			if (!this.modals[url]) {
				bc = document.createElement('button');
				bc.setAttribute('type', 'button');
				bc.setAttribute('data-bs-dismiss', 'modal');
				bc.setAttribute('aria-label', 'Chiudi');
				bc.classList.add('btn-close');
				
				h = document.createElement('div');
				h.classList.add('modal-header');
				h.append(bc);
				
				img = document.createElement('img');
				img.setAttribute('src', url);
				img.classList.add('d-block', 'mx-auto', 'img-fluid');
				
				b = document.createElement('div');
				b.classList.add('modal-body');
				b.append(img);
				
				c = document.createElement('div');
				c.classList.add('modal-content');
				c.append(h);
				c.append(b);
				
				d = document.createElement('div');
				d.classList.add('modal-dialog', 'modal-fullscreen');
				d.append(c);
				
				m = document.createElement('div');
				m.classList.add('modal', 'fade');
				m.setAttribute('tabindex', '-1');
				m.setAttribute('aria-hidden', 'true');
				m.append(d);
				document.body.append(m);
				
				this.modals[url] = new bootstrap.Modal(m);
			}
			
			this.modals[url].show();
		}
	};
	for (i = 0; i < l; i++) {
		a[i].addEventListener('click', function(e) {
			e.preventDefault();
			modal.openImage(this.href);
		});
	}
});