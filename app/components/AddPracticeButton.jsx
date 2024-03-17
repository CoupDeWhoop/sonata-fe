import { TouchableOpacity } from "react-native";
import { postLesson } from "../utils/api";

export default AddLessonButton = () => {
    const { 
        setLessonModalIsVisible, 
        setNewLesson
      } = useContext(LessonModalContext);
    
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState();
    
      const handlePress = async() => {
        try {
          const timestamp = new Date().toISOString();
          const postedLesson = await postLesson(timestamp);
          setNewLesson(postedLesson);
          setLessonModalIsVisible(true);
        } catch (error) {
          console.error('Error posting lesson:', error);
          setError('Failed to post the lesson. Please try again later.');
        }
      }

    return (
        <TouchableOpacity 
        style={{ 
            borderWidth: 1, 
            borderColor: '#000066', 
            alignItems: 'center', 
            justifyContent: 'center', 
            width: 70, 
            position: 'absolute', 
            bottom: 20, 
            right: 20, 
            height: 70, 
            backgroundColor: '#000066', 
            borderRadius: 100, 
        }} 
        onPress={() =>  handlePress()}
      > 
        <Text style={{ color: "white", fontSize: 24 }}>+</Text>
      </TouchableOpacity> 
    )
}