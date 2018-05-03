import moment from 'moment'

export default class Week {
    constructor(marker = moment()) {
        this.marker = marker
    }

    get start() {
        return moment(this.marker).startOf('isoweek')
    }

    get end() {
        return moment(this.marker).endOf('isoweek')
    }

    inWeek(date) {
        const {start, end} = this
        return date.isBetween(start, end)
    }

    weeksPassed(date) {
        const {start} = this
        return date.diff(start, 'weeks')
    }

    previousWeek() {
        return new Week(this.start.subtract(1, 'days'))
    }

    previousWeeks(n) {
        const weeks = []
        let week = this
        for (let i = 0; i < n; ++i) {
            weeks.push(week)
            week = week.previousWeek()
        }
        return weeks
    }

    marker() {
        return moment(this.marker)
    }

    toJSON() {
        const {start, end} = this
        return {
            start, end
        }
    }

    toString() {
        const {start, end} = this
        return `${start.format('YYYY/MM/DD')} - ${end.format('YYYY/MM/DD')}`
    }
}
