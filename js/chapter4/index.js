Vue.component('button-counter', {
	data: function() {
		return {
			counter: 1
		}
	},
	template: '<button @click="count" >clicked {{counter}} times</button>',
	methods: {
		count: function() {
			this.counter++;
		}
	}
})
new Vue({
	el: '#app',
	data: {
		title: 'A VUE APP'
	}
})

new Vue({
	el: '#assign',
	data() {
		return {
			title: 'A VUE APP',
			obj: {}
		}
	},
	created() {
		Object.assign(this.obj, {
			profile: 'This is a Vue App'
		})
		console.log('created', this.obj)
	},
	mounted() {
		Object.assign(this.obj, {
			profile: 'This is a Vue Test App'
		})
		console.log('mounted', this.obj)
	},
	methods: {
		toggle() {
			Object.assign(this.obj, {
				profile: 'This is a Vue App for test'
			})
			console.log('toggle', this.obj)
		}
	}
})

let store = {
	msg: '学习已经很可怜了',
	logMsg() {
		let store = {
			msg: "你能不能长点心",
			logMsg: () => {
				let store = {
					msg: "给人多留点时间吧",
					logMsg: () => {
						console.log(this.msg);
					}
				}
				store.logMsg()
			}
		}
		store.logMsg()
	}
}
store.logMsg();

Vue.component('color-text', {
	props: {
		text: String,
		color: {
			type: String,
			default: '#000',
			required: true,
			validator(value) {
				return /^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/.test(value)
			}
		}
	},
	template: '<span :style="{color:color}">{{text}}</span>'
})

new Vue({
	el: '#sxxx'
})

/**计算属性**/
let vm = new Vue({
	el: '#jssx',
	data() {
		return {
			message: 'was it a car or a cat i saw',
			watchmessage: ''
		}
	},
	computed: {
		noSpaceMsg() {
			return this.message.replace(/\s/g, '')
		},
		palindromeMsg: {
			set(value) {
				this.message = value
			},
			get() {
				return this.message.replace(/\s/g, '');
			}
		}
	},
	/**侦听属性**/
	watch: {
		message(newValue, oldValue) {
			this.watchmessage = oldValue + '~' + newValue
		}
	}
})

new Vue({
	el: '#cssgz',
	data() {
		return {
			msg: 'css挂载'
		}
	}
})

let vm3 = new Vue({
	data() {
		return {
			msg: "手动挂载"
		}
	},
})
let handleMount = function() {
	vm3.$mount('#sdgz')
}

new Vue({
	el: '#zfcmb',
	template: '<h1>template element</h1>'
})

Vue.component('fly-table', {
	props: {
		fields: {
			type: Array,
			default () {
				return []
			}
		},
		goods: {
			type: Array,
			default () {
				return []
			}
		}
	},
	methods: {
		reverse() {
			this.goods.reverse();
		}
	},
	render(createElement) {
		return createElement('div', {
			slot: 'fly-table'
		}, [
			createElement('h2', this.$slots.title),
			createElement('button', {
				class: ['btn', 'btn-text'],
				attrs: {
					disabled: false,
					title: '点击使数组倒序'
				},
				domProps: {
					innerText: '倒序'
				},
				on: {
					click: () => {
						this.goods.reverse()
					}
				},
				directives: [],
				key: 'btnReverse',
				ref: 'btnReverse'
			}),
			createElement('table', {
				style: {
					width: '400px',
					textAlign: 'left',
					lineHeight: '42px',
					border: '1px solid #eee',
					userSelect: 'none'
				}
			}, [
				createElement('tr', [
					this.fields.map(field => createElement('th', field.prop))
				]),
				this.goods.map(item => createElement('tr', {
					style: {
						color: item.isMarked ? '#ea4335' : ''
					}
				}, this.fields.map(field => createElement('td', {
					style: {
						borderTop: '1px solid #eee'
					}
				}, [
					field.prop != 'operate' ? createElement('span', item[field.prop]) :
					createElement('button', {
						class: ['btn', 'btn-text'],
						domProps: {
							innerHTML: '<span>切换标记</span>'
						},
						on: {
							click: () => {
								item.isMarked = !item.isMarked
							}
						}
					})
				]))))
			])
		])
	}
})

let render_vm = new Vue({
	el: '#render',
	data() {
		return {
			fields: [{
					label: '名称',
					prop: 'name'
				},
				{
					label: '数量',
					prop: 'quantity'
				},
				{
					label: '价格',
					prop: 'prize'
				},
				{
					label: '',
					prop: 'operate'
				},
			],
			goods: [{
					name: '苹果',
					quantity: 200,
					prize: 6.8,
					isMarked: false
				},
				{
					name: '西瓜',
					quantity: 50,
					prize: 4.8,
					isMarked: false
				}
			]
		}
	},
})

/**全局过滤**/
Vue.filter('supplyTitle3', value => {
	return value.replace(/@/g, '')
})

new Vue({
	el: '#filterDiv',
	data: {
		title: '@Test#%for#%Filter@'
	},
	filters: {
		supplyTitle1(value) {
			return value.replace(/#/g, '')
		},
		supplyTitle2(value) {
			return value.replace(/%/g, '')
		}
	}
})

/******自定义指令****/
new Vue({
	el: '#directDiv',
	data: {
		title: 'Test for Directive',
		style: {
			fontStyle: 'italic'
		}
	},
	methods: {
		handleStyle() {
			this.$set(this.style, 'color', '#ff0000')
			this.$set(this.style, 'transform', 'rotateX(45deg)')
		}
	},
	directives: {
		style: {
			bind(el, binding, vnode) {
				console.log('%c-------binding参数：el,binding,vnode------', 'font-size:18px;')
				console.log('%o\n\n%o\n\n%o', el, binding, vnode)
				let styles = binding.value
				Object.keys(styles).forEach(key => el.style[key] = styles[key])
			},
			update(el, binding, vnode) {
				let styles = binding.value
				Object.keys(styles).forEach(key => el.style[key] = styles[key])
			}
		},
		some(el, binding) {
			let text = el.innerText
			let modifiers = binding.modifiers
			if (modifiers.upper) {
				el.innerText = text.toUpperCase()
			}
			if (modifiers.lower) {
				el.innerText = text.toLocaleLowerCase()
			}
		}
	}
})

let EasyTitle = {
	name: 'EasyTitle',
	template: '<h1>大器难成</h1>'
}
let EasyMotto = {
	name: 'EasyMotto',
	template: '<p>过意防水</p>'
}
let EasyWish = {
	name: 'EasyWish',
	template: '<p>傻逼</p>'
}

new Vue({
	el: '#zjDiv',
	components: {
		EasyTitle,
		EasyMotto,
		EasyWish
	}
})

let mixin = {
	data: {
		title: 'Test for mixin'
	},
	mounted() {
		console.log('mixin mounted')
	},
	methods: {
		toggleText() {
			this.text = 'mixin text'
		}
	},
	computed: {
		plusText() {
			return '+ ' + this.text + ' +'
		}
	},
	filters: {
		supplyUpper: value => value.toUpperCase()
	},
	watch: {
		text(value) {
			console.log('mixin text:' + value)
		}
	}
}

new Vue({
	el: '#mixDiv',
	mixins: [mixin],
	data: {
		title: 'A Title',
		text: 'which one?'
	},
	mounted() {
		console.log('instance mounted')
	},
	methods: {
		toggleText() {
			this.text = 'instance text'
		}
	},
	watch: {
		text(value) {
			console.log('instance text:' + value)
		}
	}
})
