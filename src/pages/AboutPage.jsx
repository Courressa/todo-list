import { Page, ListCard, List, Item, Paragraph } from '../shared/Layout';

export default function AboutPage() {
  return (
    <Page>
        <h2>About</h2>
        <ListCard>
            <Paragraph>This is a todo web application with login, filters, search, and a profile area that shows your task stats.</Paragraph>
            <Paragraph>Use the app to organize tasks, track progress, and keep up with your to-do list.</Paragraph>

            <h3>Features</h3>
            <List>
                <Item>Add new tasks</Item>
                <Item>Edit tasks</Item>
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
