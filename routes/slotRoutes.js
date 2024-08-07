const {createSlot, mySlots, specificSlot, updateSlot, deleteSlot}= require ('../controllers/slotController.');
const requireAuth= require('../middleware/requiredAuth');

const express= require('express');
const router= express.Router();

//booked slot Route
router.get('/', mySlots);

//Delete slot Route
router.delete('/:id', deleteSlot);

//Autentication check for all the below routes
router.use(requireAuth);

//Create new slot Route
router.post('/create',createSlot);

//Specific slot Route
router.get('/:id',specificSlot);

//Update slot Route
router.patch('/:id', updateSlot);


module.exports= router;