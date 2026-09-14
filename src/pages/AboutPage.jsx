import { Page, ListCard, List, Item, Paragraph } from '../shared/Layout';

export default function AboutPage() {
  return (
    <Page>
        <h2>About</h2>
        <ListCard>
            <Paragraph>This is a simple informational component about the todo list application.</Paragraph>
            <Paragraph>Use the app to organize tasks, track progress, and keep up with your to-do list.</Paragraph>

            <h3>Features</h3>
            <List>
                <Item>Add new tasks</Item>
                <Item>Edit and delete tasks</Item>
                <Item>Mark tasks as complete</Item>
                <Item>Navigate between pages</Item>
            </List>

            <h3>Technologies Used</h3>
            <List>
                <Item>React for building the user interface</Item>
                <Item>React Router for navigation</Item>
                <Item>Vite for development and build tooling</Item>
            </List>
        </ListCard>
    </Page>
    
  )
}
