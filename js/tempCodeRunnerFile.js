function bindModal(cards) {
		 
	cards.forEach(item => {
		item.addEventListener('click', (e) => {
			e.preventDefault();
			openModal();
		})
	});
}
bindModal(videos);