
import { ScrollView, FlatList } from 'react-native';
import { Button, Card, Title, Paragraph, List } from 'react-native-paper';

export default StatsScreen = () => (
    <ScrollView>
        <Paragraph>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, in error quod aperiam tempore illo. Necessitatibus neque consequuntur distinctio nesciunt voluptatibus deleniti, reiciendis saepe. Culpa accusamus facilis harum architecto autem.</Paragraph>
        <Paragraph>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel amet laudantium ducimus ullam beatae doloribus consequuntur maxime. Optio ipsam quisquam, explicabo placeat eligendi voluptate. Aliquam, natus? Ratione eius aut facere!</Paragraph>
        <Paragraph>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium officia quo nesciunt vitae repudiandae soluta rerum aliquam maiores. Reiciendis consectetur ea esse dignissimos cumque quasi nostrum dolorum non asperiores fugit.</Paragraph>
        <Paragraph>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima cumque, corporis quasi obcaecati unde quos officiis ipsam odio fugiat quaerat atque quia architecto, fuga laboriosam similique sapiente maxime repudiandae eligendi!</Paragraph>
        <Paragraph>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Alias, sit. Excepturi omnis quia quasi debitis, nostrum cum vero adipisci atque, laborum perferendis sapiente voluptatem, repudiandae corporis eaque dolorem obcaecati. Quam.</Paragraph>
        <Paragraph>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, in error quod aperiam tempore illo. Necessitatibus neque consequuntur distinctio nesciunt voluptatibus deleniti, reiciendis saepe. Culpa accusamus facilis harum architecto autem.</Paragraph>
        <Paragraph>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel amet laudantium ducimus ullam beatae doloribus consequuntur maxime. Optio ipsam quisquam, explicabo placeat eligendi voluptate. Aliquam, natus? Ratione eius aut facere!</Paragraph>
        <Paragraph>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium officia quo nesciunt vitae repudiandae soluta rerum aliquam maiores. Reiciendis consectetur ea esse dignissimos cumque quasi nostrum dolorum non asperiores fugit.</Paragraph>
        <Paragraph>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima cumque, corporis quasi obcaecati unde quos officiis ipsam odio fugiat quaerat atque quia architecto, fuga laboriosam similique sapiente maxime repudiandae eligendi!</Paragraph>
        <Paragraph>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Alias, sit. Excepturi omnis quia quasi debitis, nostrum cum vero adipisci atque, laborum perferendis sapiente voluptatem, repudiandae corporis eaque dolorem obcaecati. Quam.</Paragraph>
        <FlatList
        data={lessons}
        keyExtractor={(item) => item.lesson_id}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Title
              title={`Lesson ${item.lesson_id}`}
              subtitle={new Date(item.lesson_timestamp).toLocaleDateString()}
              left={LeftContent}
            />
            <Card.Content>
              <Title>Brass Lesson</Title>
              <List.Section>
                <List.Subheader>Some title</List.Subheader>
                {
                    item.notes.map((note) => (<List.Item key={note.note_id} title={note.learning_focus} left={() => <List.Icon icon="folder" />} />))
                }
            </List.Section>

              
            </Card.Content>
            <Card.Actions>
              <Button>Cancel</Button>
              <Button>Ok</Button>
            </Card.Actions>
          </Card>
        )}
      />
    </ScrollView>
)