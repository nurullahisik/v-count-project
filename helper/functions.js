const groupByRegion = data => {
    return data.reduce(function (r, a) {
        a.region = a.region.toUpperCase();
        r[a.region] = r[a.region] || [];
        r[a.region].push(a);
        return r;
    }, Object.create(null));
}

module.exports = { groupByRegion }
