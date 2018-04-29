export function* ResidentsGenerator() {
    yield {
        _id: '5ade08d55af1423599d5ce9c',
        name: 'Chrisjen',
        surname: 'Avasarala',
        createdAt: '2015-08-26 09:11:17.111Z',
    }
    yield {
        _id: '5ade08d55af1423599d5ce9d',
        name: 'Jim',
        surname: 'Holden',
        createdAt: '2014-04-22 12:15:24.157Z',
    }
    yield {
        _id: '5ade08d55af1423599d5ce9e',
        name: 'Julie',
        surname: 'Mao',
        createdAt: '2014-04-22 12:15:24.157Z',
    }
}

export function* TaskGenerator() {
    yield {
        _id: '5ade08e5eaf1423599d5ce9c',
        description: 'clean epstein drive',
        firstResident: '5ade08d55af1423599d5ce9d',
        startDate: '2017-01-26 09:11:17.111Z',
        lastDone: '2016-01-26 09:11:17.111Z',
    }
}

export function next(gen) {
    return gen.next().value
}
