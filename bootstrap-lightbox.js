/**
 * Bootstrap Lightbox
 * @name bootstrap-lightbox.js
 * @author Mattia - https://www.matriz.it
 * @version 1.2.0
 * @date February 8, 2025
 * @copyright (c) 2025 Mattia at Matriz.it (info@matriz.it)
 * @license MIT - https://opensource.org/license/mit
 * @example Visit https://www.matriz.it/projects/bootstrap-lightbox/ for more informations
 */
var bootstrapLightbox = {
	'init': function(s) {
		var that = this, a = document.querySelectorAll(s), l = a.length, i = 0;
		for (i = 0; i < l; i++) {
			a[i].addEventListener('click', function(e) {
				e.preventDefault();
				that.openImage(this.href);
			});
		}
	},
	'initImages': function() {
		this.init('a[href$=".apng"],a[href$=".avif"],a[href$=".gif"],a[href$=".jfif"],a[href$=".jpg"],a[href$=".jpeg"],a[href$=".pjp"],a[href$=".pjpeg"],a[href$=".png"],a[href$=".svg"],a[href$=".webp"]');
	},
	'modals': {},
	'getModal': function(body, n, opts) {
		var m = null, d = null, c = null, h = null, bc = null, b = null, f = null, k = null;
		if (!this.modals[n]) {
			if (typeof opts !== 'object') {
				opts = {};
			}
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
			
			if (opts.footer) {
				f = document.createElement('div');
				f.classList.add('modal-footer');
				f.append(opts.footer);
			}
			
			c = document.createElement('div');
			c.classList.add('modal-content');
			c.append(h);
			c.append(b);
			if (f) {
				c.append(f);
			}
			
			d = document.createElement('div');
			d.classList.add('modal-dialog', 'modal-fullscreen');
			d.append(c);
			
			m = document.createElement('div');
			m.classList.add('modal', 'fade');
			m.setAttribute('tabindex', '-1');
			m.setAttribute('aria-hidden', 'true');
			if (opts.attributes && typeof opts.attributes === 'object') {
				for (k in opts.attributes) {
					m.setAttribute(k, opts.attributes[k]);
				}
			}
			m.append(d);
			document.body.append(m);
			
			this.modals[n] = new bootstrap.Modal(m);
		}
		return this.modals[n];
	},
	'open': function(body, n) {
		this.getModal(body, n).show();
	},
	'openImage': function(url, attrs) {
		this.open(this.getElement(url, attrs, 'image'), url);
	},
	'openIframe': function(url, attrs) {
		this.open(this.getElement(url, attrs, 'iframe'), url);
	},
	'getElement': function(url, attrs, t) {
		var b = null, k = null;
		switch (t) {
			case 'iframe':
				b = document.createElement('iframe');
				b.setAttribute('src', url);
			break;
			case 'image':
			default:
				b = document.createElement('img');
				b.setAttribute('src', url);
				b.classList.add('d-block', 'mx-auto', 'img-fluid');
			break;
		}
		if (typeof attrs === 'object') {
			for (k in attrs) {
				b.setAttribute(k, attrs[k]);
			}
		}
		return b;
	},
	'openGallery': function(urls) {
		var modals = [], l = Array.isArray(urls) ? urls.length : 0, i = 0, j = 0, m = null, f = null, c = [], b = null;
		if (l > 0) {
			for (i = 0; i < l; i++) {
				if (typeof urls[i] !== 'object') {
					urls[i] = {'url': urls[i]};
				}
				if (urls[i].url && typeof urls[i].url === 'string') {
					modals.push({
						'el': this.getElement(urls[i].url, urls[i].attributes, urls[i].type),
						'url': urls[i].url
					});
				}
			}
			l = modals.length;
			for (i = 0; i < l; i++) {
				for (j = 0; j < 2; j++) {
					c[j] = document.createElement('div');
					c[j].classList.add('col');
				}
				if (i > 0) {
					b = document.createElement('button');
					b.classList.add('btn', 'btn-primary');
					b.setAttribute('data-bs-toggle', 'modal');
					b.setAttribute('data-bs-target', '.modal[data-url="' + modals[i - 1].url + '"]');
					b.textContent = '\u{2329}';
					c[0].append(b);
				}
				
				if (i < l - 1) {
					b = document.createElement('button');
					b.classList.add('btn', 'btn-primary');
					b.setAttribute('data-bs-toggle', 'modal');
					b.setAttribute('data-bs-target', '.modal[data-url="' + modals[i + 1].url + '"]');
					b.textContent = '\u{232A}';
					c[1].classList.add('text-end');
					c[1].append(b);
				}
				f = document.createElement('div');
				f.classList.add('row', 'w-100');
				f.append(c[0]);
				f.append(c[1]);
				m = this.getModal(modals[i].el, modals[i].url, {
					'attributes': {
						'data-url': modals[i].url
					},
					'footer': l > 1 ? f : null
				});
				if (i == 0) {
					m.show();
				}
			}
		}
	}
};

document.addEventListener('DOMContentLoaded', function() {
	bootstrapLightbox.init('a.lightbox');
});