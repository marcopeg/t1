export default `
query getDailyRecords (
    $date: Date
    $period: Int
) {
    session {
        tracker {
            daily (
                date: $date
                period: $period
            ) {
                name
                date
                value
                meta
            }
        }
    }
}`
