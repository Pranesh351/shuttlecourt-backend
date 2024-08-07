const {createSubscription, mySubscriptions, specificSubscription, updateSubcription, deleteSubscription}= require('../controllers/subscriptionController');
const requireAuth= require('../middleware/requiredAuth');

const express= require('express');
const router= express.Router();

//Autentication check for below routes
router.use(requireAuth);

//Create new subscription Route
router.post('/create', createSubscription);

//Get all subscription Route
router.get('/', mySubscriptions);

//Get specfic subscription Route
router.get('/:id', specificSubscription);

//Update subscription Route
router.patch('/:id', updateSubcription);

//Delete subscription Route
router.delete('/:id', deleteSubscription);

module.exports= router;