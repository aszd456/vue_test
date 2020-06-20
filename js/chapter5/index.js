let Home = {
	template: '<p style="color:#787878;">Hello Home!</p>'
}
let About = {
	template: '<p>Hello About</p>'
}

new Vue({
	el: '#aboutDiv',
	data: {
		view: 'Home'
	},
	methods: {
		toggleView(view) {
			this.view = view
		}
	},
	components: {
		Home,
		About
	}
})
