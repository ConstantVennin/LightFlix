export default function $(element, container) {
	return new Element(element, container);
}

class Element {
	constructor(element, container) {
		if (container == undefined) {
			this.element = document.querySelectorAll(element);
		} else {
			this.element = container.querySelectorAll(element);
		}
	}

	html(html) {
		if (html == undefined) {
			return this.element[0].innerHTML;
		} else {
			this.element.forEach(element => {
				this.element.innerHTML = html;
			});
		}
	}

	append(html) {
		this.element.forEach(element => {
			element.innerHTML += html;
		});
	}

	show() {
		this.element.forEach(element => {
			element.style.display = '';
		});
	}

	hide() {
		this.element.forEach(element => {
			element.style.display = 'none';
		});
	}

	removeClass(classToRemove) {
		this.element.forEach(element => {
			element.classList.remove(classToRemove);
		});
	}

	addClass(classToAdd) {
		this.element.forEach(element => {
			this.element.classList.add(classToAdd);
		});
	}

	on(event, functionToAdd) {
		this.element.forEach(element => {
			element.addEventListener(event, functionToAdd);
		});
	}

	val() {
		return this.element[0].value;
	}
}
