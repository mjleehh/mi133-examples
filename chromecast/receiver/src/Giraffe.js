
function advance(pos, direction) {
    let {x, y} = pos
    switch (direction) {
        case 'w': {
            x -= 1
            break
        }
        case 'e': {
            x += 1
            break
        }
        case 'n': {
            y -= 1
            break
        }
        case 's': {
            y += 1
            break
        }
        default:
            throw `invalid direction ${direction}`
    }
    return {x, y}
}

function invert(direction) {
    switch (direction) {
        case 'w': {
            return 'e'
        }
        case 'e': {
            return 'w'
        }
        case 'n': {
            return 's'
        }
        case 's': {
            return 'n'
        }
        default:
            throw `invalid direction ${direction}`
    }
}

export default class Giraffe {
    constructor(head, neck = []) {
        this._head = {...head}
        this._neck = neck
    }

    move(direction) {
        const newHead = this.nextHead(direction)

        const shortendedGiraffe = new Giraffe(this._head, this._neck.slice(0, -1))
        const intersection = shortendedGiraffe.intersects(newHead)

        const firstVertebra = invert(direction)
        const newNeck = this._neck.length === 0 ? [] : [firstVertebra, ...shortendedGiraffe.neck]

        return {
            giraffe: new Giraffe(newHead, newNeck),
            intersection,
        }
    }

    grow(direction) {
        const newHead = this.nextHead(direction)
        const firstVertebra = invert(direction)
        const giraffe = new Giraffe(newHead, [firstVertebra, ...this._neck])

        const intersection = this.intersects(newHead)
        return {giraffe, intersection}
    }

    iter() {
        return (function*(head, neck) {
            let iterPos = head
            let prevDirection = neck.length > 0 ? neck[0] : null
            yield {
                pos: iterPos,
                nextDirection: null,
                prevDirection,
                index: 0,
            }

            const lastIndex = neck.length - 1
            for (let i = 0; i <= lastIndex; ++i) {
                iterPos = advance(iterPos, prevDirection)
                const nextDirection = invert(prevDirection)
                if (i !== lastIndex) {
                    prevDirection = neck[i + 1]
                } else {
                    prevDirection = null
                }
                yield {
                    pos: iterPos,
                    nextDirection,
                    prevDirection,
                    index: i + 1,
                }
            }
        }(this._head, this._neck))
    }

    intersects(pos) {
        for (let elem of this.iter()) {
            if (_.isEqual(pos, elem.pos)) {
                return pos
            }
        }
        return null
    }

    nextHead(direction) {
        return advance(this._head, direction)
    }

    get head() {
        return {...this._head}
    }

    get neck() {
        return [...this._neck]
    }
}