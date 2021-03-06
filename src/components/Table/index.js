import numeral from "numeral"

import "./Table.scss"

function Table({ countries }) {
  return (
    <div className="table">
      <table style={{ width: "100%" }}>
        <tbody>
          {countries.map(({ country, cases }, i) => (
            <tr key={i}>
              <td>{country}</td>
              <td>
                <strong>{numeral(cases).format("0.0a")}</strong>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Table
