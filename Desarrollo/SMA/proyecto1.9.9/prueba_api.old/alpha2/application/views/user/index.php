<h2><?php echo $title; ?></h2>

<?php foreach ($user as $user_item): ?>

        <h3><?php echo $user_item['nombre']." ".$user_item['apellidos']; ?></h3>
        <div class="main">
                <?php echo $user_item['email']; ?>

        </div>
        <p><a href="<?php echo site_url('user/'.$user_item['idAlumno']); ?>">Ver Usuario</a></p>
<?php endforeach; ?>