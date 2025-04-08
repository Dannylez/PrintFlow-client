import React, { useState } from 'react';
import styles from './orders.module.css';
import {
	Table,
	Tbody,
	Td,
	Th,
	Thead,
	Tr,
} from '../shared/Tables';
import {
	isUrgent,
	isWarning,
	toFormatDate,
} from '../../utilities/functions/dates';
import Loader from '../shared/Loader';
import Dropdown from '../shared/Dropdown';
import { today } from '../../utilities/functions/dates';
import { IconButton } from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom'; // Cambio aquí
import { createOrderPDF } from '../../utilities/PDF/orderPDF';
import WorkShopOrder from './WorkshopOrder';
import Modal from '../shared/Modal';
import {
	acceptOrder,
	updateOrder,
} from '../../utilities/functions/order/updateOrder';
import ClientBudget from './ClientBudget';
import { fetchFilteredOrders } from '../../redux/orders/ordersSlice';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export function AllOrdersList({
	orders,
	ordersLoading,
	changeStatus,
	toggleRefresh,
	setDateOrder,
}) {
	const [workshopOrderModal, setWorkshopOrderModal] =
		useState({
			open: false,
			order: {},
		});
	const [clientBudgetModal, setClientBudgetModal] =
		useState({ open: false, order: {} });

	const statusList = [
		'Todos',
		'Aceptada',
		'Abierta',
		'Finalizada',
		'Detenida',
		'Facturada',
	];

	const navigate = useNavigate(); // Cambio aquí

	const handleEditClick = (order) => {
		navigate('/admin/orders/form', {
			state: {
				order,
				isEdit: true,
				orderStatus: order.status,
			},
		}); // Cambio aquí
	};

	const createOrder = (order) => {
		setWorkshopOrderModal({ open: true, order: order });
		if (order.status === 'Abierta') {
			acceptOrder(order._id);
		}
	};

	const createBudget = (order) => {
		setClientBudgetModal({ open: true, order: order });
	};

	const closeWorkshopModal = () => {
		setWorkshopOrderModal((prev) => ({
			...prev,
			open: false,
		}));
	};
	const closeClientBudgetModal = () => {
		setClientBudgetModal((prev) => ({
			...prev,
			open: false,
		}));
	};

	return (
		<div className={styles.allOrders}>
			<Modal
				isOpen={workshopOrderModal.open}
				onClose={closeWorkshopModal}
			>
				<WorkShopOrder order={workshopOrderModal.order} />
			</Modal>
			<Modal
				isOpen={clientBudgetModal.open}
				onClose={closeClientBudgetModal}
			>
				<ClientBudget
					order={clientBudgetModal.order}
					toggleRefresh={toggleRefresh}
				/>
			</Modal>
			<div className={styles.allOrdersTable}>
				{/* {ordersLoading ? (
					<div className={styles.loader}>
						<Loader />
					</div>
				) : ( */}
				<div className={styles.tables}>
					<Table>
						<Thead>
							<Tr>
								<Th size={'sizeNumber'}>Nº PRES.</Th>
								<Th size={'sizeDate'}>Producto</Th>
								<Th size={'sizeClient'}>Cliente</Th>
								<Th size="sizeStatus">
									<p>Estado</p>{' '}
									<Dropdown
										options={statusList}
										handleSelect={changeStatus}
										dark
									/>
								</Th>
								<Th size={'sizeDate'}>Creado</Th>
								<Th size={'sizeDate'}>Fecha estimada</Th>
								<Th size={'sizeDate'}>
									<p
										onClick={setDateOrder}
										style={{ cursor: 'pointer' }}
									>
										Fecha límite
									</p>
									<ArrowDropDownIcon
										sx={{
											fontSize: '1.2rem',
											cursor: 'pointer',
										}}
									/>
								</Th>
								<Th size={'sizeDate'}>Precio</Th>
								<Th size={'sizeNumber'}>Desv.</Th>
								<Th size={'sizePDF'}>Orden</Th>
								<Th size={'sizePDF'}>Pres. Cli.</Th>
								<th className={styles.editTh}>Editar</th>
							</Tr>
						</Thead>
						<Tbody>
							{orders.map((order) => (
								<Tr
									key={order?._id}
									/* warning={isWarning(order)}
									urgent={isUrgent(order)} */
								>
									<Td size={'sizeNumber'}>
										{order?.orderNumber}
									</Td>
									<Td>{order?.product}</Td>
									<Td size={'sizeClient'}>
										{order?.client?.companyName}
									</Td>
									<Td size="sizeStatus">{order?.status}</Td>
									<Td size={'sizeDate'}>
										{toFormatDate(order?.dateCreated)}
									</Td>
									<Td size={'sizeDate'}>
										{toFormatDate(order?.dateEstimate) ??
											'-'}
									</Td>
									<Td size={'sizeDate'}>
										{toFormatDate(order?.dateFinal) ?? '-'}
									</Td>
									<Td>
										$
										{new Intl.NumberFormat('es-AR').format(
											order?.budget
										)}
									</Td>
									<Td size={'sizeNumber'}>
										{order?.deviation}
									</Td>
									<td className={styles.editTd}>
										<IconButton
											style={{ padding: 0 }}
											onClick={() => createOrder(order)}
										>
											<PictureAsPdfIcon color="error" />
										</IconButton>
									</td>
									{/* <Td>
											<PictureAsPdfIcon
												color="error"
												onClick={() => createOrder(order)}
											/>
										</Td> */}
									<td className={styles.editTd}>
										<IconButton
											style={{ padding: 0 }}
											onClick={() => createBudget(order)}
										>
											<PictureAsPdfIcon color="error" />
										</IconButton>
									</td>
									<td className={styles.editTd}>
										<IconButton
											style={{ padding: 0 }}
											onClick={() => handleEditClick(order)} // Cambio aquí
										>
											<EditIcon
												fontSize="small"
												sx={{ color: '#101204' }}
											/>
										</IconButton>
									</td>
								</Tr>
							))}
						</Tbody>
					</Table>
				</div>
				{/* )} */}
			</div>
		</div>
	);
}
