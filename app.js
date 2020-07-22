// Item Class
class Item {
	constructor(name, category, amount) {
		this.name = name;
		this.category = category;
		this.amount = amount;
	}
}

// UI
class UI {
	static displayItems() {
		const items= Store.getItems('items');

		items.forEach((item) => UI.addItemToList(item));
	}

	static addItemToList(item) {
		const list = document.querySelector('#item-list');

		const row = document.createElement('tr');

		row.innerHTML = `
			<td>${item.name}</td>
			<td>${item.category}</td>
			<td>${item.amount}</td>
			<td><a href="#" class="btn btn-danger btn-sm delete">Remove</a></th>
		`;

		list.appendChild(row);
	}

	static deleteItem(el) {
		if(el.classList.contains('delete')) {
			el.parentElement.parentElement.remove();
		}
	}


	static showAlert(message, className) {
		const div = document.createElement('div');

		div.className = `alert alert-${className}`;
		div.appendChild(document.createTextNode(message));

		const container = document.querySelector('.container');
		const form = document.querySelector('#item-form');

		container.insertBefore(div, form);

		setTimeout(() => document.querySelector('.alert').remove(), 3000);
	}

	static clearFields() {
		document.querySelector('#name').value = '';
		document.querySelector('#category').value = '';
		document.querySelector('#amount').value = '';
	}
}

// Storage
class Store {
	static getItems() {
		let items;
		if(localStorage.getItem('items') === null) {
			items = [];
		} else {
			items = JSON.parse(localStorage.getItem('items'));
		}
		return items;
	}
	static addItem(item) {
		const items = Store.getItems();

		items.push(item);

		localStorage.setItem('items', JSON.stringify(items));
	}
	static removeItem(name) {
		const items = Store.getItems();

		items.forEach((item, index) => {
			if(item.name === name) {
				items.splice(name, 1);
			}
		});

		localStorage.setItem('items', JSON.stringify(items));
	}
}
// Events
document.addEventListener('DOMContentLoaded', UI.displayItems);

document.querySelector('#item-form').addEventListener('submit', (e) => {
	e.preventDefatult();
	const name = document.querySelector('#name').value;
	const category = document.querySelector('#category').value;
	const amount = document.querySelector('#amount').value;

	if(name === '' || category === '' || amount === '') {
		UI.showAlert('Invalid', 'danger');
	} else {
		const item = new Item(name, category, amount);

		UI.addItemToList(item);
		Store.addItem(item);
		UI.showAlert('Item added', 'success');
		UI.clearFields();
	}
});

document.querySelector('#item-list').addEventListener('click', (e) => {
	UI.deleteItem(e.target);
	Store.removeItem(e.target.parentElement.previousElementSibling.textContent);
	UI.showAlert('Item removed', 'info');

});
