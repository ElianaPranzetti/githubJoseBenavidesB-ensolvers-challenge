
import { Routes, Route } from 'react-router-dom';
import { ArchivedNotes, MyNotes } from '../pages';

//Manage all routes
export const AppRouter = () => {

  return (
    <Routes>
        <Route path="/" element={ <MyNotes />} />

        <Route exact path="/archived" element={ <ArchivedNotes />} />
    </Routes>
  )
}