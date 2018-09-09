
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
            yield {
                pos: iterPos,
                direction: null,
                index: 0,
            }

            for (let i = 0; i < neck.length; ++i) {
                const direction = neck[i]
                iterPos = advance(iterPos, direction)
                yield {
                    pos: iterPos,
                    direction,
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