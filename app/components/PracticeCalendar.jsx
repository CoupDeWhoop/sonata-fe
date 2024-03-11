import CalendarHeatmap from 'react-native-range-responsive-calendar-heatmap';
import { ScrollView } from 'react-native'
import { data } from '../../data/practice-data.js'
import { staticData } from '../../data/static-data.js'

export default PracticeCalendar= () => {
    //API call for data then adapt for chart
    return (
        <ScrollView horizontal={true}>
            <CalendarHeatmap
                endDate={new Date("2019-03-25")}
                numDays={100}
                colorArray={["#FCE4EC", "#D44B79", "#6B1928", "#9F3251", "#360000"]}
                values={staticData}
            />
        </ScrollView>
    )
//ssss
}