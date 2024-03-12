import CalendarHeatmap from 'react-native-range-responsive-calendar-heatmap';
import { ScrollView } from 'react-native'
import { data } from '../../data/practice-data.js'
import { staticData } from '../../data/static-data.js'

export default PracticeCalendar= ({ practises }) => {
    const formattedPracticeData = practises.map((practice) => {
        return {date: practice.practice_timestamp}
    })
    return (
        <ScrollView horizontal={true} contentContainerStyle={{ paddingLeft: 16, }}>
            <CalendarHeatmap
                endDate={Date.now()}
                numDays={80}
                colorArray={["#FCE4EC", "#D44B79", "#6B1928", "#9F3251", "#6B1928"]}
                values={formattedPracticeData}
            />
        </ScrollView>
    )
}