import { List, fromJS } from 'immutable'
import { isClear } from '../../unit/'
import { fillLine, blankLine } from '../../unit/const'
import states from '../../control/states'
const t = setTimeout

const store = {

}

export default {
  props: ['cur', 'reset', 'propMatrix'],
  watch: {
    $props: {
      handler(val = {}, oldVal) {
        this.propsChange(val)
      },
      deep: true
    }
  },
  render() {
    let matrix
    if (this.isOver) {
      matrix = this.overState
    } else {
      matrix = this.getResult()
    }
    matrix = matrix.toJS()
    return (
      <div class="matrix">
        {matrix.map((p, k1) =>
          <p>
            {p.map((e, k2) => {
              if (typeof e === 'string') {
                return (<b className={'c n'}>{e}</b>)
              } else if(Array.isArray(e)) {
                console.log(37, e)
                return (<b className={'c d'}>{e[0]}</b>)
              } else {
                return (<b className={(e === 1 ? 'c' : '') + (e === 2 ? 'd' : '')} />)
              }
            })}
          </p>
        )}
      </div>
    )
  },
  data() {
    return {
      clearLines: false,
      animateColor: 2,
      isOver: false,
      overState: null
    }
  },
  methods: {
    propsChange(nextProps) {
      const clears = isClear(nextProps.propMatrix)
      const overs = nextProps.reset
      setTimeout(() => {
        this.clearLines = clears
        this.isOver = overs
      }, 0)
      if (clears && !this.clearLines) {
        this.clearAnimate(clears)
      }
      if (!clears && overs && !this.isOver) {
        this.over(nextProps)
      }
    },
    getResult(props) {
      if (!props) {
        props = this.$props
      }
      const cur = props.cur
      const shape = cur && cur.shape
      const xy = fromJS((cur && cur.xy) || [0, 0])
      let matrix = fromJS(props.propMatrix)
      const clearLines = this.clearLines
      if (clearLines) {
        const animateColor = this.animateColor
        clearLines.forEach(index => {
          matrix = matrix.set(
            index,
            List([
              animateColor,
              animateColor,
              animateColor,
              animateColor,
              animateColor,
              animateColor,
              animateColor,
              animateColor,
              animateColor,
              animateColor
            ])
          )
        })
      } else if (shape) {
        shape.forEach((m, k1) => {
          const row = xy.get(0) + k1
          m.forEach((n, k2) => {
              const column = xy.get(1) + k2
              if (n && row >= 0) {
                // 竖坐标可以为负
                let line = matrix.get(row)
                let color
                if (line.get(column) === 1 && !clearLines) {
                  // 矩阵与方块重合
                  console.log(97, xy)
                  color = [cur.type]
                  console.log(line.get(column - 1), line.get(column + 1))
                  const nextLine = matrix.get(row + 1)
                  if (nextLine) {
                    console.log(nextLine.get(column))
                  }
                } else {
                  color = cur.type
                }
                line = line.set(column, color)
                matrix = matrix.set(row, line)
              }
            })
        })
      }
      return matrix
    },
    clearAnimate() {
      const anima = callback => {
        t(() => {
          this.animateColor = 0
          t(() => {
            this.animateColor = 2
            if (typeof callback === 'function') {
              callback()
            }
          }, 100)
        }, 100)
      }
      anima(() => {
        anima(() => {
          anima(() => {
            t(() => {
              states.clearLines(this.propMatrix, this.clearLines)
            }, 100)
          })
        })
      })
    },
    over(nextProps) {
      let overState = this.getResult(nextProps)
      this.overState = overState
      const exLine = index => {
        if (index <= 19) {
          overState = overState.set(19 - index, List(fillLine))
        } else if (index >= 20 && index <= 39) {
          overState = overState.set(index - 20, List(blankLine))
        } else {
          states.overEnd()
          return
        }
        this.overState = overState
      }

      for (let i = 0; i <= 40; i++) {
        t(exLine.bind(null, i), 40 * (i + 1))
      }
    }
  }
}
