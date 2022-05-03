
// Returns a route object with method, path, cotroller class and method
export default function createRoute(m: string,r: string,c: any,a: string,p ? : any) {
    return {
        method: m,
        route: r,
        controller: c,
        action: a,
        perimissions: p,
    };
}