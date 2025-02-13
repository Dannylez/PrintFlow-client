import React from 'react';
import styles from './clients.module.css';
import {
	Table,
	Tbody,
	Td,
	Th,
	Thead,
	Tr,
} from '../shared/Tables';
import Loader from '../shared/Loader';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

export function AllClientsList({ clients, loadingClient }) {
	return (
		<div className={styles.allOrders}>
			<div className={styles.allOrdersTable}>
				{loadingClient ? (
					<div className={styles.loader}>
						<Loader />
					</div>
				) : (
					<div className={styles.tables}>
						<Table>
							<Thead>
								<Tr>
									<Th size={'big'}>Nombre de la empresa</Th>
									<Th size={'big'}>Razon social</Th>
									<Th size={'small'}>RUT</Th>
									<Th>Telefono</Th>
									<th className={styles.editTh}>Editar</th>
								</Tr>
							</Thead>
							<Tbody>
								{clients.map((client) => (
									<Tr key={client?._id}>
										<Td size={'big'}>
											{client?.companyName}
										</Td>
										<Td size={'big'}>
											{client?.legalName}
										</Td>
										<Td size={'small'}>{client?.RUT}</Td>
										<Td>{client?.phone}</Td>
										<td className={styles.editTd}>
											<IconButton
												style={{ padding: 0 }}
												/* onClick={() =>
													handleEditClick(order)
												} */
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
				)}
			</div>
		</div>
	);
}
