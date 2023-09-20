import React from 'react';
import Button from '../../../../../components/button/Button';
import TrashIcon from '../../../../../components/icons/TrashIcon';
import PencilIcon from '../../../../../components/icons/PencilIcon';

export default function RowQuestionOption({option, onDelete, type, onEdit}) {
    return (
        <tr>
            {
                type === 'question' && 
                <th scope="row">                
                    {
                        option.letter
                    }
                </th>
            }            
            <td>
                {
                    option.description
                }
            </td>
            <td>
                <div className='d-flex'>
                    <Button type='primary' onClick={onEdit}>
                        <PencilIcon className='icon'/>
                    </Button>

                    <Button type='danger' className='mx-2' onClick={onDelete}>
                        <TrashIcon className='icon'/>
                    </Button>
                </div>
            </td>
        </tr>
    )
}
