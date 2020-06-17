var ve = new Vue({
	el: '#app',
	data: {
		isshow: true,
		message: 'hello',
	},
	methods: {
		click: function() {
			alert("你好，世界");
		}
	}
});

var ve2 = new Vue({
	el: '#demo',
	data: {
		message: 'vue生命周期',

	},
	beforeCreate: function() {
		console.group("------------beforecreate-----------")
		console.log('el:' + this.$el)
		console.log('data:' + this.$data)
		console.log('message:' + this.message)
	},
	created: function() {
		console.group("------------created-----------")
		console.log('el:' + this.$el)
		console.log('data:' + this.$data)
		console.log('message:' + this.message)
	},
	beforeMount: function() {
		console.group("------------beforemount-----------")
		console.log('el:' + this.$el)
		console.log('data:' + this.$data)
		console.log('message:' + this.message)
	},
	mounted: function() {
		console.group("------------mounted-----------")
		console.log('el:' + this.$el)
		console.log('data:' + this.$data)
		console.log('message:' + this.message)
	},
	beforeUpdate: function() {
		console.group("------------beforeupdate-----------")
		console.log('el:' + this.$el)
		console.log('data:' + this.$data)
		console.log('message:' + this.message)
	},
	updated: function() {
		console.group("------------updated-----------")
		console.log('el:' + this.$el)
		console.log('data:' + this.$data)
		console.log('message:' + this.message)
	},
	beforeDestroy: function() {
		console.group("------------destotry-----------")
		console.log('el:' + this.$el)
		console.log('data:' + this.$data)
		console.log('message:' + this.message)
	},
	destroyed: function() {
		console.group("------------destroyed-----------")
		console.log('el:' + this.$el)
		console.log('data:' + this.$data)
		console.log('message:' + this.message)
	},
	methods: {
		changemessage: function() {
			this.message = '666'
		},
		destory: function() {
			this.$destroy();
		}
	}
});

Vue.component("all", {
	template: '<div><h1>{{name}}</h1></div>',
	// template:'#box1',
	data: function() {
		return {
			name: '李四'
		}
	}
})
var ve3 = new Vue({
	el: "#box",
	data: {
		message: 'hello'
	}
});



var ve4 = new Vue({
	el: '#box',
	data: {},
	//父級
	components: {
		'test': {
			template: "#box1",
			data: function() {
				return {
					message: 'aaa'
				}
			},
			//子级
			components: {
				'box1': {
					template: "#box2",
					//子级想将父级的一个值，作为自己的一个局部变量
					data: function() {
						return {
							mymsg: this.msg
						}
					},
					//计算属性
					computed: {
						mymsg1: function() {
							return this.msg + '!'
						}
					},
					props: [
						'num', 'txt', 'msg'
					]
				}
			}
		}
	}
})
