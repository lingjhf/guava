
import { CodeExample } from '../../components/code-example'
import { GTable, type TableColumn } from '@lingjhf/guava'

export default function TableBaseLazy() {
  const code = `

  `

  const columns: TableColumn[] = [
    { label: 'Date', prop: 'date', width: 150 },
    { label: 'Name', prop: 'name', width: 120 },
    { label: 'State', prop: 'state', width: 120, },
    { label: 'City', prop: 'city', width: 320 },
    { label: 'Address', prop: 'address', width: 500 },
    { label: 'Zip', prop: 'zip', width: 120 },
  ]

  const data = [{
    date: '2016-05-03',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },]

  return (
    <CodeExample code={code} language='jsx'>
      <GTable columns={columns} data={data} ></GTable>
    </CodeExample>
  )
}
