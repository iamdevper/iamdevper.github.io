const express = require('express');
const router = express.Router();

// courses data demo
const courses = [
    { id: 1, name: 'courses1'},
    { id: 2, name: 'courses2'},
    { id: 3, name: 'courses3'}
];

// get - view
router.get('/', (req, res) => {
    res.send(courses);
})

router.get('/:id', (req, res) => {
    const course = courses.find( c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('The course with the given ID was not found.');
    res.send(course);
})

// post - add
router.post('/', (req, res) => {
    const { error } = valideCourse(req.body);
    if (error) return res.status(404).send(error.details[0].message);

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
})

// put - update
router.put('/:id', (req, res) => {
    const course = courses.find( c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('The course with the given ID was not found.');
    
    // const result = valideCourse(req.body);
    const { error } = valideCourse(req.body);
    if (error) return res.status(404).send(error.details[0].message);

    course.name = req.body.name;
    res.send(course);
})

// delete
router.delete('/:id', (req, res) => {
    const course = courses.find( c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('The course with the given ID was not found.');

    // delete
    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course);
})

// function validate
function valideCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(course, schema);
}

module.exports = router;