import React, { Component } from 'react';
import { Pie } from 'react-chartjs-2';

class Chart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chartData: {
                labels: ['Dentro da Instituição', 'Emprestados'],
                datasets: [
                    {
                        label: 'Equipamentos',
                        data: [
                            75, 25
                        ],
                        backgroundColor: [
                            'rgba(255, 208, 0, 1)',
                            'rgba(93, 169, 233, 1)'
                        ]
                    }
                ]
            },

            chartDataTeste: {
                labels: ['Saulovers', 'Brandaolovers'],
                datasets: [
                    {
                        label: 'Estudantes',
                        data: [
                            50, 50
                        ],
                        backgroundColor: [
                            'rgba(255, 0, 0, 1)',
                            'rgba(0, 0, 255, 1)'
                        ]
                    }
                ]
            }
        }
    }

    render() {
        return (
            <>
                <div className="chart">
                    <Pie
                        data={this.state.chartData}
                        width={400}
                        height={200}
                        options={{
                            maintainAspectRatio: false
                        }}
                    />
                </div>
                <div className="chart">
                    <Pie
                        data={this.state.chartDataTeste}
                        width={400}
                        height={200}
                        options={{
                            maintainAspectRatio: false
                        }}
                    />
                </div>
            </>
        )
    }
}

export default Chart;