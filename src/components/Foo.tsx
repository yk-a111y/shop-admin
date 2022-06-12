// export default () => {
//   return (
//     <div>
//       <h1>Foo函数式组件</h1>
//     </div>
//   )
// }
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    msg: {
      type: String,
      required: true
    }
  },
  render () {
    return (
      <div> {this.msg} </div>
    )
  }
})
