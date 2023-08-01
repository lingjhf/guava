
import { CodeExample } from '../../components/code-example'
import { GTable, type TableColumn } from '@lingjhf/guava'

export default function TableFixedLazy() {
  const code = `

  `

  const columns: TableColumn[] = [
    { label: 'Date', prop: 'date', width: 150, fixed: 'left' },
    { label: 'Name', prop: 'name', width: 120, },
    { label: 'State', prop: 'state', width: 120, },
    { label: 'City', prop: 'city', width: 320 },
    { label: 'Address', prop: 'address', width: 600 },
    { label: 'Zip', prop: 'zip', width: 120, fixed: 'right' },
  ]

  const data = [
    {
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
    },
    {
      date: '2016-05-01',
      name: 'Tom',
      state: 'California',
      city: 'Los Angeles',
      address: 'No. 189, Grove St, Los Angeles',
      zip: 'CA 90036',
    },
    {
      date: '2016-05-08',
      name: 'Tom',
      state: 'California',
      city: 'Los Angeles',
      address: 'No. 189, Grove St, Los Angeles',
      zip: 'CA 90036',
    },
    {
      date: '2016-05-06',
      name: 'Tom',
      state: 'California',
      city: 'Los Angeles',
      address: 'No. 189, Grove St, Los Angeles',
      zip: 'CA 90036',
    },
    {
      date: '2016-05-07',
      name: 'Tom',
      state: 'California',
      city: 'Los Angeles',
      address: 'No. 189, Grove St, Los Angeles',
      zip: 'CA 90036',
    },
  ]

  return (
    <CodeExample code={code} language='jsx'>
      <GTable columns={columns} data={data} height={250}></GTable>
    </CodeExample>
  )
}
