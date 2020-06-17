Vue.component('button-counter', {
	data: function() {
		return {
			counter: 1
		}
	},
	template: '<button @click="counter++" >clicked {{counter}} times</button>'
})
new Vue({
	el: '#app',
	data: {
		title: 'A VUE APP'
	}
})
