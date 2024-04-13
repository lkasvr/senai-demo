export interface testsResult {
  Id_da_Maquina: string
  Id_do_Teste: string
  Id_do_Corpo_de_Prova: string
  Data: string
  Tipo_do_Ensaio: 'Cilíndrico'
  Dimensoes: [
    {
      Descricao: 'Diâmetro'
      Valor: string
    }
  ]
  Forca: string
  Tensão: string
  Ruptura: 'ND'
}
