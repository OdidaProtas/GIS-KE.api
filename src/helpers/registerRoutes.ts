
// Combines all route arrays to one route array
export default function(routesArray: any[]) {
    return routesArray.reduce((p, c) => p.concat(c), [])
}