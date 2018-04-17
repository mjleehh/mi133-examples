export function* bookmarkGenerator() {
        yield {
            _id: '5ad49ee9773dfc6d96b637ad',
            name: 'google',
            url: 'https://www.google.com',
        }
        yield {
            _id: '5ad49ee9773dfc6d96b637ac',
            name: 'google',
            url: 'https://www.google.com',
        }
        yield {
            _id: '5ad49ee9773dfc6d96b637af',
            name: 'facebook',
            url: 'https://www.facebook.com',
        }
    }

export function next(gen) {
    return gen.next().value
}
