import axios from 'axios';
import { today } from '../dates';
import { format } from 'date-fns';

export const createNewOrder = async (fields) => {
	const {
		orderNumber,
		product,
		client,
		contactName,
		contactPhone,
		contactEmail,
		deliveryData,
		scheme,
		dateEstimate,
		dateFinal,
		descriptionClient,
		descriptionWork,
		descriptionPrivate,
		printTasks,
		otherTasks,
	} = fields;

	const tasks = [...printTasks, ...otherTasks];
	let budgetEstimate = 0,
		budget = 0;

	printTasks.map((task) => {
		budgetEstimate += task.estimatedCost;
		budget += task.totalCost;
	});
	otherTasks.map((task) => {
		task.estimatedCost
			? (budgetEstimate += task.estimatedCost)
			: (budgetEstimate += Number(task.cost));
		task.cost
			? (budget += Number(task.cost))
			: (budget += task.estimatedCost);
	});

	const deviation =
		((budget - budgetEstimate) * 100) / budgetEstimate +
		'%';

	const body = {
		orderNumber,
		product,
		client,
		contact: {
			name: contactName,
			phone: contactPhone,
			email: contactEmail,
		},
		deliveryData,
		status: 'En espera',
		request:
			'asdasd' /* aca tengo que ver si va a ir o no en el formulario */,
		scheme,
		dateCreated: today(),
		dateEstimate: format(dateEstimate, 'dd/MM/yy'),
		dateFinal: format(dateFinal, 'dd/MM/yy'),
		descriptionClient,
		descriptionWork,
		descriptionPrivate,
		tasks,
		budgetEstimate,
		budget,
		deviation,
	};

	try {
		const response = await axios.post(
			`${process.env.REACT_APP_API_URL}/api/order`,
			body
		);
		return response;
	} catch (error) {
		console.log(error);
	}
};
