class History {
    static instance: History | null = null
    private array: string[] = []
    private position: number = -1

    constructor() {
        if (History.instance) {
            return History.instance
        }

        History.instance = this

        return this
    }

    add(json: string) {
        const tempArray = this.array.slice(0, this.position + 1)

        this.array = [...tempArray, json]
        this.position++
    }

    redo() {
        if (this.position >= this.array.length - 1) return

        const newPosition = this.position + 1
        const json = this.array[newPosition]
        this.position = newPosition

        return json
    }

    undo() {
        if (this.position <= 0) return null

        const json = this.array[this.position - 1]
        this.position = this.position - 1

        return json
    }

    isCanRedo() {
        return this.position < this.array.length - 1
    }

    isCanUndo() {
        return this.position > 1
    }
}

const history = new History()

export default history
