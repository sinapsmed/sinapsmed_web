export function createUrl(base: string, queries?: { [key: string]: any }) {
    const url = new URL(base);

    if (queries) {
        Object.keys(queries).forEach(key => {
            const query = queries[key]
            if (query) {
                if(Array.isArray(query)){
                    query.forEach(element => {
                        url.searchParams.append(key, element)
                    });
                }
                else url.searchParams.append(key, query)
            }
        })
    }

    return url.toString();
}

export function createRoute(base: string, queries?: { [key: string]: any }) {    
    if (queries) {
        let searchParams: string[] = []
        Object.keys(queries).forEach(key => {
            const query = queries[key]            
            if (query) searchParams.push(`${key}=${query}`)
        })
        const params = searchParams.join('&')
        if(params.length === 0) return base     
        return `${base}?${params}`
    }

    return base
}