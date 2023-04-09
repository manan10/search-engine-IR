import React from 'react'
import { Modal } from 'antd'
import RadioGroup from '../RadioGroups/RadioGroup'
import Options from '../../resources/Options'

function SettingsModal({ isModelOpen, setIsModalOpen, model, cluster, expansion, setModel, setCluster, setExpansion }) {
    return (
        <Modal 
            title="Change Search Parameters"
            bodyStyle={{ padding: '20px', marginTop: '-20px' }}    
            open={ isModelOpen } 
            style={{ top: 90 }}
            cancelButtonProps={{ style: { display: 'none' } }}
            onCancel={ () => setIsModalOpen(false) }
            okText="Save"
            onOk={ () => setIsModalOpen(false) }
            okButtonProps={{ style: { backgroundColor: '#24282c' } }}
        >
            <div style={{ textAlign:  'left' }}>
                <RadioGroup label="Query Model" options={ Options.model } onChange={ setModel } value={ model } />
                <RadioGroup label="Clustering method" options={ Options.cluster } onChange={ setCluster } value={ cluster } />
                <RadioGroup label="Expansion method" options={ Options.expansion } onChange={ setExpansion } value = { expansion } />
            </div>
        </Modal>
    )
}

export default SettingsModal