import { IMessage } from "../models/message.model";


export const messages: Array<IMessage> = [
    // 0. Erro ao salvar
    {
        type: 'error',
        title: 'ERROR',
        body: 'Error ao salvar.'
    },
    // 1. Erro ao atualizar
    {
        type: 'error',
        title: 'ERROR',
        body: 'Error ao atualizar.'
    },
    // 2. Paciente cadastrado com sucesso!
    {
        type: 'success',
        title: 'Cadastro',
        body: 'Paciente cadastrado com sucesso!'
    },
    // 3. Error ao Cadastrar o Paciente.
    {
        type: 'error',
        title: 'Cadastro',
        body: 'Erro ao cadastrar o Paciente.'
    },
    // 4. Paciente atualizado com sucesso!
    {
        type: 'success',
        title: 'Cadastro',
        body: 'Paciente atualizado com sucesso!'
    },
    // 5. Error ao Atualizar o Paciente.
    {
        type: 'error',
        title: 'Cadastro',
        body: 'Error ao atualizar cadastro.'
    },
    // 6. Gasto Energético cadastrado com sucesso!
    {
        type: 'success',
        title: 'Gastos Energéticos',
        body: 'Gasto Energético cadastrado com sucesso!'

    },
    // 7 . Error ao Atualizar o Paciente.
    {
        type: 'error',
        title: 'Gasto Energético',
        body: 'Error ao Atualizar o Paciente.'

    },
]