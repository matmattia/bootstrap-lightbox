/**
 * Bootstrap Lightbox
 * @name bootstrap-lightbox.js
 * @author Mattia - https://www.matriz.it
 * @version 1.1.0
 * @date March 3, 2024
 * @copyright (c) 2024 Mattia at Matriz.it (info@matriz.it)
 * @license MIT - https://opensource.org/license/mit
 * @example Visit https://www.matriz.it/projects/bootstrap-lightbox/ for more informations
 */
var bootstrapLightbox = {
	'init': function(s) {
		var a = document.querySelectorAll(s), l = a.length, i = 0;
		for (i = 0; i < l; i++) {
			a[i].addEventListener('click', function(e) {
				e.preventDefault();
				modal.openImage(this.href);
			});
		}
	},
	'initImages': function() {
		this.init('a[href$=".gif"],a[href$=".jpg"],a[href$=".jpeg"],a[href$=".png"],a[href$=".webp"]');
	},
	'modals': {},
	'open': function(body, n) {
		var m = null, d = null, c = null, h = null, bc = null, b = null;
		if (!this.modals[n]) {
			bc = document.createElement('button');
			bc.setAttribute('type', 'button');
			bc.setAttribute('data-bs-dismiss', 'modal');
			bc.setAttribute('aria-label', 'Chiudi');
			bc.classList.add('btn-close');
			
			h = document.createElement('div');
			h.classList.add('modal-header');
			h.append(bc);
			
			b = document.createElement('div');
			b.classList.add('modal-body');
			b.append(body);
			
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
			
			this.modals[n] = new bootstrap.Modal(m);
		}
		this.modals[n].show();
	},
	'openImage': function(url) {
		var img = document.createElement('img');
		img.setAttribute('src', url);
		img.classList.add('d-block', 'mx-auto', 'img-fluid');
		this.open(img, url);
	}
};

document.addEventListener('DOMContentLoaded', function() {
	bootstrapLightbox.init('a.lightbox');
});