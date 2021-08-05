USE Projeto_inicial

INSERT INTO	TipoUsuario			(nomeTipoUsuario)
VALUES							('Administrador')
								,('Comum');
								
INSERT INTO Usuario				(nomeUsuario, idTipoUsuario, email, senha)
VALUES							('Admin', 1, 'admin@admin.com', 'admin132')

INSERT INTO Sala				(nomeSala, metragem, andar)
VALUES							('Sala 14', '6m x 8m x 3m', '2')
								,('Sala 8', '7m x 7m x 3m', '1')

INSERT INTO Equipamento			(nomeEquipamento, tipoEquipamento, marca, numeroDeSerie, descricao, numeroPatrimonio, estado)
VALUES							('Notebook i7', 'Laptop', 'Dell Inspiron |15', '20210715001', 'Notebook para o uso dos alunos', '500001', '1')
								,('Notebook i7', 'Laptop', 'Dell Inspiron |15', '20210715002', 'Notebook para o uso dos alunos', '500002', '0')
								,('Mesa Octagonal', 'Imobiliário', 'Sylvia Design', '20210712003', 'Mesa para o uso dos alunos', '500003', '0')
								,('Mesa Octagonal', 'Imobiliário', 'Sylvia Design', '20210712004', 'Mesa para o uso dos alunos', '500004', '1')
								,('Escrivaninha', 'Imobiliário', 'Porto Espresso', '20210701005', 'Mesa para o uso dos professores', '500005', '1')
								,('Escrivaninha', 'Imobiliário', 'Porto Espresso', '20210701006', 'Mesa para o uso dos professores', '500006', '0')
								,('Cadeira de Escritorio', 'Imobiliário', 'FlexForm', '20210703007', 'Cadeira para o uso dos alunos/professores', '500007', '1')
								,('Cadeira de Escritorio', 'Imobiliário', 'FlexForm', '20210703008', 'Cadeira para o uso dos alunos/professores', '500008', '1')
								,('Cadeira de Escritorio', 'Imobiliário', 'FlexForm', '20210703009', 'Cadeira para o uso dos alunos/professores', '500009', '1')
								,('Cadeira de Escritorio', 'Imobiliário', 'FlexForm', '20210703010', 'Cadeira para o uso dos alunos/professores', '500010', '0')
								,('Cadeira de Escritorio', 'Imobiliário', 'FlexForm', '20210703011', 'Cadeira para o uso dos alunos/professores', '500011', '0')
								,('Cadeira de Escritorio', 'Imobiliário', 'FlexForm', '20210703012', 'Cadeira para o uso dos alunos/professores', '500012', '0')

INSERT INTO ControleEquipamento	(idSala, idEquipamento, dataEntrada)
VALUES							( 1, 1, '02/08/2021')
								,( 1, 2, '02/08/2021')
								,( 1, 3, '04/08/2021')
								,( 2, 4, '04/08/2021')
								,( 2, 5, '03/08/2021')
								,( 2, 6, '03/08/2021')
								,( 2, 7, '03/08/2021')
								,( 2, 8, '03/08/2021')
								,( 1, 9, '03/08/2021')
								,( 2, 10, '03/08/2021')
								,( 1, 11, '03/08/2021')
								,( 2, 12, '03/08/2021')