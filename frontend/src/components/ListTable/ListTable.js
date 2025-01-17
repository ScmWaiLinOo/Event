import React from 'react';
import { Table, Button } from 'react-bootstrap';
import moment from 'moment';
import styles from './ListTable.module.scss';

const ListTable = ({ tableProperty, list, btnFunction, handleDialog }) => {
  return (
    <Table striped bordered hover className={styles.eventTable}>
      <thead>
        <tr>
          {tableProperty.headers.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {
          list.map((data, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              {tableProperty.property.map((dist, i) => (
                <td key={data.id + 'table-prop' + i}>
                  {
                    (dist.type === 'image') ? <img alt='image' className={styles.eventImg} src={data[dist.key]} />
                      :
                      (dist.type === 'date') ? (dist.key === 'fromDate') ? moment(data[dist.key]).format('DD/MM/YYYY') + '~' + moment(data.toDate).format('DD/MM/YYYY') : moment(data[dist.key]).format('DD MMM YYYY')
                        :
                        (dist.type === 'time') ? data.fromTime + '~' + data.toTime
                        :
                        (dist.type === 'title') ?
                          <a className={styles.eventName} onClick={() => handleDialog(data)}>{data[dist.key]}</a>
                          :
                          (dist.type === 'buttons') ?
                          dist.value === 'changedStatus' ?
                            <>
                              {(data.status === 'new' || data.status === 'approved') &&
                                <Button variant="danger" className={styles.rejectBtn} onClick={() =>
                                  btnFunction(data.id, 'rejected')}>Reject</Button>}
                              {(data.status === 'new' || data.status === 'rejected') &&
                                <Button variant="primary" onClick={() =>
                                  btnFunction(data.id, 'approved')}>Approve</Button>}
                            </>
                            :
                            <>
                              <Button variant="primary" className={styles.rejectBtn} onClick={() =>
                                btnFunction(data.id, 'edit')}>Edit</Button>
                              <Button variant="danger" onClick={() =>
                                btnFunction(data.id, 'delete')}>Delete</Button>
                            </>
                            :
                            data[dist.key]
                  }
                </td>
              ))}
            </tr>
          ))
        }
      </tbody>
    </Table>
  )
}

export default ListTable;